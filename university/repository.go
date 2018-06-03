package university

import (
	"fmt"
	"log"

	"gopkg.in/mgo.v2/bson"

	mgo "gopkg.in/mgo.v2"
)

// Repository ...
type Repository struct{}

// SERVER the DB server
const SERVER = "localhost:27017"

// DBNAME the name of the DB instance
const DBNAME = "YouCanGetIn"

// DOCNAME the name of the document
const DOCNAME = "universities"

// GetUniversities returns the list of universities
func (r Repository) GetUniversities() Universities {

	session, err := mgo.Dial(SERVER)
	if err != nil {
		fmt.Println("Failed to establish connection to Mongo server:", err)
	}
	defer session.Close()

	c := session.DB(DBNAME).C(DOCNAME)
	results := Universities{}
	if err := c.Find(nil).All(&results); err != nil {
		fmt.Println("Failed to write results:", err)
	}

	return results
}

// AddUniversity adds a university to the list
func (r Repository) AddUniversity(university University) bool {

	session, err := mgo.Dial(SERVER)
	defer session.Close()

	university.ID = bson.NewObjectId()
	session.DB(DBNAME).C(DOCNAME).Insert(university)

	if err != nil {
		log.Fatal(err)
		return false
	}
	return true
}

// UpdateUniversity updates a university entry
func (r Repository) UpdateUniversity(university University) bool {

	session, err := mgo.Dial(SERVER)
	defer session.Close()

	session.DB(DBNAME).C(DOCNAME).UpdateId(university.ID, university)

	if err != nil {
		log.Fatal(err)
		return false
	}

	return true
}

// DeleteUniversity deletes a university entry
func (r Repository) DeleteUniversity(id string) string {

	session, err := mgo.Dial(SERVER)
	defer session.Close()

	// Verify id is ObjectId, otherwise bail
	if !bson.IsObjectIdHex(id) {
		return "NOT FOUND"
	}

	// Grab id
	oid := bson.ObjectIdHex(id)

	// Remove user
	if err = session.DB(DBNAME).C(DOCNAME).RemoveId(oid); err != nil {
		log.Fatal(err)
		return "INTERNAL ERR"
	}

	// Write status
	return "OK"
}

// AddGrade adds a grade to the list
func (r Repository) AddGrade(grade Grade) bool {

	session, err := mgo.Dial(SERVER)
	defer session.Close()

	grade.ID = bson.NewObjectId()
	session.DB(DBNAME).C(DOCNAME).Insert(grade)

	if err != nil {
		log.Fatal(err)
		return false
	}
	return true
}

// GetGrade retrieves
func (r Repository) GetGrade() Grades {

	session, err := mgo.Dial(SERVER)
	if err != nil {
		fmt.Println("Failed to establish connection to Mongo server:", err)
	}
	defer session.Close()

	c := session.DB(DBNAME).C(DOCNAME)
	results := Universities{}
	if err := c.Find(nil).All(&results); err != nil {
		fmt.Println("Failed to write results:", err)
	}

	return results
}
