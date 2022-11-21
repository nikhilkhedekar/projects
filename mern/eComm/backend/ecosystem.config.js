module.exports = {
    apps: [
      {
        name: 'NMK Store',
        script: 'server.js',
        instances: 1,
        autorestart: true,
        exec_mode: "cluster",
        watch: true,
        max_memory_restart: '1G'
      },
      {
        name: 'Worker1',
        script: './utils/sendEmail.js',
        instances: 1
      },   
    ]
  };
  