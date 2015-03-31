FROM nodesource/wheezy

MAINTAINER Gil Perry

RUN \
    npm install http-server -g && \
    npm install huvr-frontend 

#ADD run.sh ./
#apt-get install -y git && \
#apt-get -y update && \
#RUN git clone gitlab@git.bskyb.com:gil.perry/huvr.git
#RUN chmod a+x run.sh


EXPOSE 8080
ENTRYPOINT ["http-server"]
CMD ["node_modules/huvr-frontend"]

