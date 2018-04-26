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

// SystemList stores an array of systems
type SystemList struct {
	List []System `json:"list"`
}

// Grade stores a grade
type Grade struct {
	Score  string `json:"score"`
	System System `json:"system"`
}

// System represents a program at a university
type System struct {
	Name string `json:"name"`
}

// University represents a university
type University struct {
	ID       bson.ObjectId `bson:"_id"`
	Name     string        `json:"name"`
	Location string        `json:"location"`
	Grades   []Grade       `json:"grades"`
}

// Universities ...
type Universities []University
