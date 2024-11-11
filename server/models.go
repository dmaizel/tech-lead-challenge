package pkg

import "time"

type SubmitEvent struct {
	QuestionID int `json:"question_id"`
	SubmitTime time.Time
	Language   string `json:"lang"`
	UserName   string `json:"user"`
	Code       string `json:"code"`
}

type Dashboard struct {
	QuestionID int    `json:"question_id"`
	Language   string `json:"lang"`
	UserName   string `json:"user"`
	Code       string `json:"code"`
}
