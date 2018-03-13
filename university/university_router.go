package university

import (
	"net/http"

	"github.com/gorilla/mux"
)

func getRoutes() *mux.Router {
	// Init router
	r := university.NewRouter()

	// Handle routes
	r.HandleFunc("/", getMain).Methods("GET")
	r.HandleFunc("/universities", getUniversities).Methods("GET")
	r.HandleFunc("/universities/{id}", getUniversity).Methods("GET")
	r.HandleFunc("/universities/{id}", createUniversity).Methods("POST")
	r.HandleFunc("/universities/{id}", deleteUniversity).Methods("DELETE")
	r.HandleFunc("/universities/{id}", changeUniversity).Methods("PUT")

	// Declare static file directory and point it to assets folder
	staticFileDirectory := http.Dir("./assets")

	// Declare handler to route requests to respective filename
	staticFileHandler := http.StripPrefix("/assets/", http.FileServer(staticFileDirectory))

	// Matches all routes starting with "/assets/"
	r.PathPrefix("/assets/").Handler(staticFileHandler).Methods("GET")

	return r
}
