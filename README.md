# sylvain_reucherand-2018

[![CircleCI](https://circleci.com/gh/sreucherand/sylvain_reucherand-2018/tree/develop.svg?style=svg)](https://circleci.com/gh/sreucherand/sylvain_reucherand-2018/tree/develop)
[![CircleCI](https://circleci.com/gh/sreucherand/sylvain_reucherand-2018/tree/master.svg?style=svg)](https://circleci.com/gh/sreucherand/sylvain_reucherand-2018/tree/master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## How to ?

#### Update the Docker image

🔑 — *login*

```sh
docker login -u sreucherand
```

🚧 — *build*

```sh
docker build -t sreucherand/circleci-node-ffmpeg:$VERSION .
```

🚀 — *push*

```sh
docker push sreucherand/circleci-node-ffmpeg:$VERSION
```
