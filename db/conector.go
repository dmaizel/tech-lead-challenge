package db

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"tech-lead-challenge/service/logparser"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "admin"
	password = "root"
	dbname   = "logs"
)

type SqlConnector struct {
	DB *sql.DB
}

type Connector interface {
	Connect() error
	InsertLogs(ctx context.Context, logs []logparser.Log) error
	FetchLogs(from string, to string) ([]logparser.Log, error)
}

func NewSqlConnector() Connector {
	return &SqlConnector{}
}

func (sc *SqlConnector) Connect() error {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		return err
	}
	err = db.Ping()
	if err != nil {
		return err
	}

	absPath, _ := filepath.Abs("initdb.sql")
	data, err := os.ReadFile(absPath)
	if err != nil {
		return err
	}
	_, err = db.Exec(string(data))
	if err != nil {
		return err
	}
	sc.DB = db
	return nil
}

func (sc *SqlConnector) InsertLogs(ctx context.Context, logs []logparser.Log) error {
	for _, log := range logs {
		sqlStatement := `INSERT INTO logs (service_name, level,datecreated, data) VALUES ($1, $2, $3 ,$4)`
		_, err := sc.DB.Exec(sqlStatement, log.ServiceName, log.Level, log.TimeStamp, log.Data)
		if err != nil {
			return err
		}
	}
	return nil
}

func (sc *SqlConnector) FetchLogs(from string, to string) ([]logparser.Log, error) {
	query := fmt.Sprintf("SELECT * FROM logs where datecreated between '%s' and '%s'", from, to)
	rows, err := sc.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// An album slice to hold data from returned rows.
	var logs []logparser.Log

	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var log logparser.Log
		if err := rows.Scan(&log.ServiceName, &log.Level, &log.TimeStamp, &log.Data); err != nil {
			return logs, err
		}
		logs = append(logs, log)
	}
	if err = rows.Err(); err != nil {
		return logs, err
	}
	return logs, nil
}
