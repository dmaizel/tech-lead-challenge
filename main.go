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
	sourceType := os.Getenv("SOURCE_TYPE")
	logLocation := os.Getenv("LOG_LOCATION")

	// run service for logs ingestion
	logingest.NewLogIngester(sourceType, logLocation, connector).ProcessLogsFromSource()
	// run http server
	server.StartServer(connector)
}
