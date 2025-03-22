package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.mailservice.EmailService;
import com.example.demo.model.User;
import com.example.demo.repo.CrudRepo;
import com.example.demo.services.CrudService;

import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")
public class CrudRestController {
     
    @Autowired
    private CrudService service;
    
    @Autowired
    private EmailService em;

    @GetMapping("/getcomplainlist")
    public List<User> fetchcomplainList() {
        List<User> products = new ArrayList<User>();
        products = service.fetchcomplainList();
        return products;
    }
    
    @GetMapping("/getcomplaints/status/{status}")
    public ResponseEntity<List<User>> fetchComplaintsByStatus(@PathVariable String status) {
        List<User> complaints = service.fetchComplaintsByStatus(status);
        if (complaints.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no complaints found
        }
        return ResponseEntity.ok(complaints);
    }

    @PostMapping("/addcomplain")
    public User saveProduct(@RequestBody User user) {
        // Set status to "Logged" automatically when a new complaint is added
        user.setStatus("Logged");
        
        String complainName = user.getComplainSubject();
        String complainerRole = user.getRoleOfComplainer();
        String complainerDept = user.getDept();

        // Notify the user who added the complaint
        String userBody = "Hello " + complainerRole + " from " + complainerDept + 
                          " department. Your complain of '" + complainName + 
                          "' has been sent successfully to the Complain Department of VJTI.";
        em.sendSimpleMail(user.getEmail(), userBody, "Complain Sent Successfully");

        // Notify the admin about the new complaint
        String adminEmail = "snehalmohite54321@gmail.com"; 
        String adminBody = "A new complaint has been added by a " + complainerRole + 
                           " from the " + complainerDept + " department. " +
                           "\n\nComplain Subject: " + complainName + 
                           "\n\nPlease take necessary action.";
        em.sendSimpleMail(adminEmail, adminBody, "New Complain Notification");

        // Save the complaint to the database with status set to "Logged"
        return service.saveComplainToDB(user);
    }

    @GetMapping("/getcomplainbyid/{id}")
    public User fetchComplainToById(@PathVariable int id) {
        return service.fetchComplainToById(id).get();
    }

    @DeleteMapping("/deletecomplainbyid/{id}")
    public String deleteComplainById(@PathVariable int id, @RequestParam String reason) {
        // Fetch the complaint to get the details before deletion
        Optional<User> complainOpt = service.fetchComplainToById(id);
        
        if (!complainOpt.isPresent()) {
            return "Complaint not found!";
        }

        User complain = complainOpt.get();

        // Send email to the user about the deletion and the reason
        String userBody = "Dear " + complain.getRoleOfComplainer() + " from " + complain.getDept() +
                          " department, your complaint titled '" + complain.getComplainSubject() + "' has been deleted.\n" +
                          "Reason for deletion: " + reason;
        em.sendSimpleMail(complain.getEmail(), userBody, "Complaint Deleted");

        // Send email to the admin about the deletion
        String adminBody = "The complaint titled '" + complain.getComplainSubject() + "' from the " +
                           complain.getDept() + " department has been deleted.\n" +
                           "Complaint details:\n" +
                           "Complain Subject: " + complain.getComplainSubject() + "\n" +
                           "Complain Description: " + complain.getComplainDescription() + "\n" +
                           "Role of Complainer: " + complain.getRoleOfComplainer() + "\n" +
                           "Reason for Deletion: " + reason;
        em.sendSimpleMail("snehalmohite54321@gmail.com", adminBody, "Complaint Deleted Notification");

        // Perform the actual deletion
        return service.deleteComplainToById(id);
    }

    @PutMapping("/updatecomplain/{id}")
    public ResponseEntity<String> updateComplain(
            @PathVariable("id") int id,
            @RequestBody User updatedComplain) {  // Assuming you are using Complain class instead of User
        Optional<User> existingComplainOpt = service.fetchComplainToById(id);

        if (existingComplainOpt.isPresent()) {
            User existingComplain = existingComplainOpt.get();
            // Store a list of updated fields for email notification
            List<String> updatedFields = new ArrayList<>();

            // Compare each field and add the changed ones to the list
            if (!updatedComplain.getComplainSubject().equals(existingComplain.getComplainSubject())) {
                updatedFields.add("Complain Subject");
                existingComplain.setComplainSubject(updatedComplain.getComplainSubject());
            }
            if (!updatedComplain.getComplainDescription().equals(existingComplain.getComplainDescription())) {
                updatedFields.add("Complain Description");
                existingComplain.setComplainDescription(updatedComplain.getComplainDescription());
            }
            if (!updatedComplain.getRoleOfComplainer().equals(existingComplain.getRoleOfComplainer())) {
                updatedFields.add("Role of Complainer");
                existingComplain.setRoleOfComplainer(updatedComplain.getRoleOfComplainer());
            }
            if (!updatedComplain.getDept().equals(existingComplain.getDept())) {
                updatedFields.add("Department");
                existingComplain.setDept(updatedComplain.getDept());
            }
            if (updatedComplain.getRoomNo() != existingComplain.getRoomNo()) {
                updatedFields.add("Room Number");
                existingComplain.setRoomNo(updatedComplain.getRoomNo());
            }
            if (updatedComplain.getFloorNo() != existingComplain.getFloorNo()) {
                updatedFields.add("Floor Number");
                existingComplain.setFloorNo(updatedComplain.getFloorNo());
            }
            if (!updatedComplain.getBuilding().equals(existingComplain.getBuilding())) {
                updatedFields.add("Building");
                existingComplain.setBuilding(updatedComplain.getBuilding());
            }
            if (!updatedComplain.getImageOfSubject().equals(existingComplain.getImageOfSubject())) {
                updatedFields.add("Image of Subject");
                existingComplain.setImageOfSubject(updatedComplain.getImageOfSubject());
            }
            if (!updatedComplain.getEmail().equals(existingComplain.getEmail())) {
                updatedFields.add("Email");
                existingComplain.setEmail(updatedComplain.getEmail());
            }
            if (!updatedComplain.getStatus().equals(existingComplain.getStatus())) {
                updatedFields.add("Status");
                existingComplain.setStatus(updatedComplain.getStatus());
            }
            if (updatedComplain.getCreatedDate() != null && !updatedComplain.getCreatedDate().equals(existingComplain.getCreatedDate())) {
                updatedFields.add("Created Date");
                existingComplain.setCreatedDate(updatedComplain.getCreatedDate());
            }

            // Check if the priority has changed
            if (!updatedComplain.getPriority().equals(existingComplain.getPriority())) {
                updatedFields.add("Priority");
                existingComplain.setPriority(updatedComplain.getPriority()); // Update priority
            }

            // Update the complain
            service.updateComplain(existingComplain);

            // Send email notifications
            if (!updatedFields.isEmpty()) {
                String updatedData = String.join(", ", updatedFields);
                String userBody = "Hello, Your complain of " + existingComplain.getComplainSubject() +
                        " has been updated. The following fields have been changed: " + updatedData;
                em.sendSimpleMail(existingComplain.getEmail(), userBody, "Complain Updated");

                String adminBody = "A complaint of " + existingComplain.getComplainSubject() +
                        " has been updated with the following changes: " + updatedData +
                        "\n\nComplain ID: " + existingComplain.getComplainId() +
                        "\nPlease take necessary action.";
                em.sendSimpleMail("snehalmohite54321@gmail.com", adminBody, "Complain Updated Notification");

                return ResponseEntity.ok("Complain updated successfully, and notifications sent.");
            } else {
                return ResponseEntity.ok("No changes detected.");
            }
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if not found
        }
    }

    
    @GetMapping("/dashboard-metrics")
    public ResponseEntity<Map<String, Object>> getDashboardMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        // Fetch all complaints
        List<User> allComplaints = service.fetchcomplainList();
        
        // Count complaints by status
        long loggedCount = allComplaints.stream().filter(c -> "Logged".equals(c.getStatus())).count();
        long inProgressCount = allComplaints.stream().filter(c -> "Assigned".equals(c.getStatus())).count();
        long doneCount = allComplaints.stream().filter(c -> "Done".equals(c.getStatus())).count();
        
        // Count complaints resolved within a week
        long resolvedWithinWeek = allComplaints.stream()
            .filter(c -> "Done".equals(c.getStatus()) && 
                         c.getCreatedDate() != null && 
                         c.getCreatedDate().plusDays(7).isAfter(LocalDate.now()))
            .count();
        
        // Count complaints resolved after a week
        long resolvedAfterWeek = allComplaints.stream()
            .filter(c -> "Done".equals(c.getStatus()) && 
                         c.getCreatedDate() != null && 
                         c.getCreatedDate().plusDays(7).isBefore(LocalDate.now()))
            .count();
        
        // This week's complaints
        LocalDate startOfWeek = LocalDate.now().with(java.time.DayOfWeek.MONDAY);
        long thisWeekComplaints = allComplaints.stream()
            .filter(c -> c.getCreatedDate() != null && !c.getCreatedDate().isBefore(startOfWeek))
            .count();
        
        // Group complaints by status for the bar chart
        Map<String, Long> complaintsByStatus = new HashMap<>();
        complaintsByStatus.put("Logged", loggedCount);
        complaintsByStatus.put("Assigned", inProgressCount);
        complaintsByStatus.put("Done", doneCount);
        
        // Populate the metrics map
        metrics.put("loggedCount", loggedCount);
        metrics.put("inProgressCount", inProgressCount);
        metrics.put("doneCount", doneCount);
        metrics.put("resolvedWithinWeek", resolvedWithinWeek);
        metrics.put("resolvedAfterWeek", resolvedAfterWeek);
        metrics.put("thisWeekComplaints", thisWeekComplaints);
        metrics.put("complaintsByStatus", complaintsByStatus);
        
        return ResponseEntity.ok(metrics);
    }


    // New endpoint to update the status of a complaint
    @PutMapping("/updatecomplaintsstatus")
    public ResponseEntity<List<User>> updateComplaintsStatus(@RequestBody List<User> complaints) {
        List<User> updatedComplaints = service.updateComplaintsStatus(complaints);
        return ResponseEntity.ok(updatedComplaints);
    }
}
