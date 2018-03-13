package university

import "gopkg.in/mgo.v2/bson"

// University object
type University struct {
	ID    bson.ObjectId `bson:"_id" json:"id"`
	Name  string        `bson:"name" json:"name"`
	Grade string        `bson:"grade" json:"grade"`
}

var universities []University
