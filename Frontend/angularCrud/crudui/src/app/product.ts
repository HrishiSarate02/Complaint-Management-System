export class Complain {
    complainId: number;
    complainSubject: string;
    complainDescription: string;
    roleOfComplainer: string;
    dept: string;
    roomNo: number;
    floorNo: number;
    building: string;
    imageOfSubject: string;
    email: string;
    status: string;
    createdDate: string; // Use string to handle the `LocalDate` from Spring Boot
    priority: string;

    constructor(
        complainId: number,
        complainSubject: string,
        complainDescription: string,
        roleOfComplainer: string,
        dept: string,
        roomNo: number,
        floorNo: number,
        building: string,
        imageOfSubject: string,
        email: string,
        status: string,
        createdDate: string,
        priority: string
    ) {
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
        this.status= status;
        this.createdDate = createdDate;
        this.priority = priority;
    }
}
