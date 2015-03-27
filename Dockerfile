FROM gperry100/huvr

MAINTAINER Gil Perry

WORKDIR /data/HUVR

EXPOSE 8080

ENTRYPOINT ["http-server"]

CMD ["src"]

