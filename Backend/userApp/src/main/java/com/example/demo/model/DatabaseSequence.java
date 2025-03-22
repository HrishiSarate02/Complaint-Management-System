package com.example.demo.model;

import org.springframework.data.annotation.Id; 
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "database_sequences")
public class DatabaseSequence {

    @Id
    private String id;

    private long seq;

    // Constructors
    public DatabaseSequence() {}

    public DatabaseSequence(String id, long seq) {
        this.id = id;
        this.seq = seq;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

   

    public void setSeq(long seq) {
        this.seq = seq;
    }

	public long getSeq() {
		return seq;
	}
}
