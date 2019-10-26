FROM circleci/node:12

USER root

RUN apt-get update
RUN apt-get install ffmpeg
