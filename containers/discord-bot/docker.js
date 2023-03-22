const { default: volume } = require("node-docker-api/lib/volume");

//return them as an array of containers that can later be modified by the bot
const Docker = require("node-docker-api").Docker;

//NOTE: this is for windows only
//on unix use /var/run/docker.sock for socketPath
const docker = new Docker();

let images = [
  {
    name: "vanilla",
    image: "blbergo/vanilla-server",
    ExposedPorts: { 25565: {} },
    HostConfig: {
      PortBindings: {
        25565: [{ HostPort: "25565" }],
      },
      Mounts: [
        {
          Target: "/data/vanilla",
          Source: "serverVolumes",
          Type: "volume",
          ReadOnly: false,
        },
      ],
    },
  },
  {
    name: "skyfactory",
    image: "blbergo/skyfactory4",
    ExposedPorts: { 25575: {} },
    HostConfig: {
      PortBindings: {
        25575: [{ HostPort: "25575" }],
      },
      Mounts: [
        {
          Target: "/data/skyfactory4",
          Source: "serverVolumes",
          Type: "volume",
          ReadOnly: false,
        },
      ],
    },
  },
  {
    name: "Web",
    image: "blbergo/web-server",
    ExposedPorts: { 3000: {} },
    HostConfig: {
      PortBindings: {
        3000: [{ HostPort: "3000" }],
      },
      Mounts: [
        {
          Target: "/data/web",
          Source: "serverVolumes",
          Type: "volume",
          ReadOnly: false,
        },
      ],
    },
  },
];

const promisifyStream = (stream) =>
  new Promise((resolve, reject) => {
    console.log(stream);
    stream.on("data", (d) => console.log(d.toString()));
    stream.on("end", resolve);
    stream.on("error", reject);
  });

function startContainers() {
  //first check that volumes are up and running
  docker.volume.list().then((volumes) => {
    if (volumes.length == 0) {
      //create volumes
      docker.volume.create({ Name: "serverVolumes", Driver: "local" });
    }
  });

  console.log("Volumes successfully initialized");

  docker.container.list({ all: true }).then((containers) => {
    //create containers if necessary
    if (containers.length == 0) {
      for (let i = 0; i < images.length; i++) {
        docker.container
          .create({
            Image: images[i].image,
            name: images[i].name,
            ExposedPorts: images[i].ExposedPorts,
            HostConfig: images[i].HostConfig,
          })
          .then((container) => container.start());
      }
    } else {
      for (let j = 0; j < containers.length; j++) {
        containers[j].restart();
      }
    }
  });
}

function stopAllContainers() {
  docker.container
    .list({ all: true })
    .then((containers) => {
      for (let i = 0; i < containers.length; i++) {
        containers[i].stop();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

async function restartAllContainers() {
  let state = false;
  await docker.container.list({ all: true }).then((containers) => {
    for (let i = 0; i < containers.length; i++) {
      containers[i].restart();
    }

    state = true;
  });

  return state;
}


module.exports = {
  docker,
  startContainers,
  stopAllContainers,
  restartAllContainers,
};
