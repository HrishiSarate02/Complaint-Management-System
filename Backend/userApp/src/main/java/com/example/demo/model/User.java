package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Document(collection = "complain")
public class User {

    @Transient
    public static final String SEQUENCE_NAME = "complain_sequence";

    @Id
    private long complainId;
    private String complainSubject;
    private String complainDescription;
    private String roleOfComplainer;
    private String dept;
    private int roomNo;
    private int floorNo;
    private String building;

    @Field("imageOfSubject")
    private String imageOfSubject; // Use String to store Base64 encoded image
    
    private String email;
    private LocalDate createdDate;
    private String status; // Status can be "Logged", "Assigned", "Done"
    
    // New field for priority
    private String priority; // Priority can be "High" or "Low"

    // Constructor
    public User(long complainId, String complainSubject, String complainDescription, String roleOfComplainer,
                String dept, int roomNo, int floorNo, String building, String imageOfSubject, String email,
                LocalDate createdDate, String status, String priority) {
        this.complainId = complainId;
        this.complainSubject = complainSubject;
        this.complainDescription = complainDescription;
        this.roleOfComplainer = roleOfComplainer;
        this.dept = dept;
        this.roomNo = roomNo;
        this.floorNo = floorNo;
        this.building = building;
        this.imageOfSubject = imageOfSubject;
        this.email = email;
        this.createdDate = createdDate;
        this.status = status;
        this.priority = priority; // Initialize priority
    }

    // Default constructor
    public User() {
        this.createdDate = LocalDate.now(); // Automatically set the current date
        this.status = "Logged"; // Default status
        this.priority = "Low"; // Default priority
    }

    // Getters and Setters

    public long getComplainId() {
        return complainId;
    }

    public void setComplainId(long complainId) {
        this.complainId = complainId;
    }

    public String getComplainSubject() {
        return complainSubject;
    }

    public void setComplainSubject(String complainSubject) {
        this.complainSubject = complainSubject;
    }

    public String getComplainDescription() {
        return complainDescription;
    }

    public void setComplainDescription(String complainDescription) {
        this.complainDescription = complainDescription;
    }

    public String getRoleOfComplainer() {
        return roleOfComplainer;
    }

    public void setRoleOfComplainer(String roleOfComplainer) {
        this.roleOfComplainer = roleOfComplainer;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public int getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(int roomNo) {
        this.roomNo = roomNo;
    }

    public int getFloorNo() {
        return floorNo;
    }

    public void setFloorNo(int floorNo) {
        this.floorNo = floorNo;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getImageOfSubject() {
        return imageOfSubject;
    }

    public void setImageOfSubject(String imageOfSubject) {
        this.imageOfSubject = imageOfSubject;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Getter and setter for priority
    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

}
