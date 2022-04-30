FROM golang:latest

ENV GOPROXY https://mirrors.aliyun.com/goproxy/,direct
WORKDIR $GOPATH/src/mynote-api-gin
COPY . $GOPATH/src/mynote-api-gin
RUN go build .

EXPOSE 5004
ENTRYPOINT ["./mynote-api-gin"]


# docker build -t mynote-api-gin .
