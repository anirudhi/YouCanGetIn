package main

import (
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandler(t *testing.T) {

	r := getRoutes()

	// Create a new server using the "httptest" "newServer" method
	mockServer := httptest.NewServer(r)

	// Form new http request
	resp, err := http.Get(mockServer.URL + "/hello")

	// Check for error in forming the request
	if err != nil {
		t.Fatal(err)
	}

	// Check response code
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Status should be ok, got %d", resp.StatusCode)
	}

	defer resp.Body.Close()

	// Read the body in bytes
	b, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatal(err)
	}

	// Convert the bytes into a string
	respString := string(b)
	expected := "Hello World!"

	// Check if response matches
	if respString == expected {
		t.Errorf("Response should be %s, got %s", expected, respString)
	}
}

func TestRouterForNonExistentRoute(t *testing.T) {

	r := getRoutes()
	mockServer := httptest.NewServer(r)

	resp, err := http.Post(mockServer.URL+"/hello", "", nil)

	if err != nil {
		t.Fatal(err)
	}

	// We want status to be 405
	if resp.StatusCode != http.StatusMethodNotAllowed {
		t.Errorf("Status should be 405, got %d", resp.StatusCode)
	}

	// Test body, but this time we expect an empty body
	defer resp.Body.Close()
	b, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		t.Fatal(err)
	}

	respString := string(b)
	expected := ""

	if respString != expected {
		t.Errorf("Response should be %s, got %s", expected, respString)
	}
}

func TestStaticFileServer(t *testing.T) {

	r := getRoutes()
	mockServer := httptest.NewServer(r)

	// Hit the 'GET /assets/ route
	resp, err := http.Get(mockServer.URL + "/assets/")

	if err != nil {
		t.Fatal(err)
	}

	// We want a 200 status
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Status should be 200, got %d", resp.StatusCode)
	}

	// Test that the content-type of index.html is "text/html; charset=utf-8"
	contentType := resp.Header.Get("Content-Type")
	expectedContentType := "text/html; charset=utf-8"

	if expectedContentType != contentType {
		t.Errorf("Wrong content type, expected %s, got %s", expectedContentType, contentType)
	}
}
