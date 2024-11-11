package main

import (
	"os"
	"tech-lead-challenge/db"
	"tech-lead-challenge/server"
	"tech-lead-challenge/service/logingest"
)

func main() {
	connector := db.NewSqlConnector()
	err := connector.Connect()
	if err != nil {
		os.Exit(1)
	}
	// run service for logs ingestion
	logingest.NewLogIngester("fs", "/Users/chen.keinan/workspace/work/tech-lead-challenge/example/docker.log", connector).ProcessLogsFromSource()
	// run http server
	server.StartServer(connector)
}
