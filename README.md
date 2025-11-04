# TuneIt API

Backend GraphQL service for TuneIt.

## Overview

Responsible for authentication, user data, service listings, bookings, and optional speech recognition.

## Tech Stack

Node.js  
Express  
Apollo Server  
MongoDB (Mongoose)  
Vosk (optional speech recognition)

## File Structure

app.js  
  Express server boot, CORS, body parsers, mounts /graphql

modules/database.js  
  MongoDB connection

schema.js  
  Unified GraphQL schema composition and error formatting

modules/server.js  
  Apollo Server init (schema, context)

modules/user/*  
  User types, resolvers, signup/login, profile queries

modules/service/*  
  Service creation, booking, service list queries

modules/speech/*  
  Vosk integration for offline speech recognition

## Core Responsibilities

JWT auth  
CRUD for users, mechanics, services  
Booking workflows  
Speech processing endpoints

## Local Development

npm install  
npm run dev
