package university

import (
	"time"

	"gopkg.in/mgo.v2/bson"
)

// Date stores the date
type Date struct {
	Year  int        `json:"year"`
	Month time.Month `json:"month"`
	Day   int        `json:"day"`
}

// Grade stores a grade
type Grade struct {
	System string  `json:"system"`
	Score  float32 `json:"score"`
}

// Program represents a program at a university
type Program struct {
	ID     bson.ObjectId `bson:"_id"`
	Name   string        `json:"name"`
	Level  string        `json:"level"`
	Grades []Grade       `json:"grades"`
}

// University represents a university
type University struct {
	ID          bson.ObjectId `bson:"_id"`
	Name        string        `json:"name"`
	Programs    string        `json:"programs"`
	LastUpdated string        `json:"LastUpdated"`
}

// Universities ...
type Universities []University
