var nstall = require('./')

if (process.argv.length !== 3) {
  throw new Error('Not enough arguments')
}

nstall(process.argv[2])
