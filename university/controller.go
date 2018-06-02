package university

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

// Controller ...
type Controller struct {
	Repository Repository
}

// Index GET
func (c *Controller) Index(w http.ResponseWriter, r *http.Request) {
	// List of all universities
	universities := c.Repository.GetUniversities()
	log.Println(universities)

	data, _ := json.Marshal(universities)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
	return
}

// AddUniversity POST
func (c *Controller) AddUniversity(w http.ResponseWriter, r *http.Request) {

	var university University
	// Read the body of the request
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))

	if err != nil {
		log.Fatalln("Error, AddUniversity", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := r.Body.Close(); err != nil {
		log.Fatalln("Error, AddUniversity", err)
	}

	if err := json.Unmarshal(body, &university); err != nil {
		// Unprocessable entity
		w.WriteHeader(422)
		if err := json.NewEncoder(w).Encode(err); err != nil {
			log.Fatalln("Error, AddUniversity unmarshaling data", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	// Adds the university to the database
	success := c.Repository.AddUniversity(university)
	if !success {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusCreated)
	return
}

// UpdateUniversity PUT
func (c *Controller) UpdateUniversity(w http.ResponseWriter, r *http.Request) {

	var university University
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))

	if err != nil {
		log.Fatalln("Error UpdateUniversity", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := r.Body.Close(); err != nil {
		log.Fatalln("Error UpdateUniversity", err)
	}

	if err := json.Unmarshal(body, &university); err != nil {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		// Unprocessable entity
		w.WriteHeader(422)
		if err := json.NewEncoder(w).Encode(err); err != nil {
			log.Fatalln("Error UpdateUniversity unmarshalling data", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	// Updates the university in the DB
	success := c.Repository.UpdateUniversity(university)
	if !success {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	return
}

// DeleteUniversity DELETE /
func (c *Controller) DeleteUniversity(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id := vars["id"] // param id

	// Delete a university by id
	if err := c.Repository.DeleteUniversity(id); err != "" {
		if strings.Contains(err, "404") {
			w.WriteHeader(http.StatusNotFound)
		} else if strings.Contains(err, "500") {
			w.WriteHeader(http.StatusInternalServerError)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	return
}

// GetGrades of a single university GET
func (c *Controller) GetGrades(w http.ResponseWriter, r *http.Request) {
	// List of all universities
	universities := c.Repository.GetUniversities()
	log.Println(universities)

	data, _ := json.Marshal(universities)
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
	return
}

// AddGrade of a single universit POST	
func (c *Controller) AddGrade(w http.ResponseWriter, r *http.Request) {

	var grade Grade
	// Read the body of the request
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))

	if err != nil {
		log.Fatalln("Error, Add", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := r.Body.Close(); err != nil {
		log.Fatalln("Error, AddUniversity", err)
	}

	if err := json.Unmarshal(body, &university); err != nil {
		// Unprocessable entity
		w.WriteHeader(422)
		if err := json.NewEncoder(w).Encode(err); err != nil {
			log.Fatalln("Error, AddUniversity unmarshaling data", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	// Adds the university to the database
	success := c.Repository.AddUniversity(university)
	if !success {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusCreated)
	return
}