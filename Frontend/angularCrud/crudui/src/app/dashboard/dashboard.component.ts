import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { NgserviceService } from '../ngservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardMetrics: any = {};
  complaintsByStatus: any = {};
  currentYear: number = new Date().getFullYear();

  constructor(private dashboardService: NgserviceService) {}

  ngOnInit(): void {
    this.loadDashboardMetrics();
  }

  loadDashboardMetrics(): void {
    this.dashboardService.getDashboardMetrics().subscribe(
      (data) => {
        this.dashboardMetrics = data;
        this.complaintsByStatus = data.complaintsByStatus;
        
        // Debugging: Log the fetched data
        console.log('Fetched data:', data);
        console.log('Complaints by Status:', this.complaintsByStatus);

        // Calculate the total complaints count (Logged + Assigned + Done)
        this.dashboardMetrics.thisWeekComplaints =
          (this.complaintsByStatus.Logged || 0) +
          (this.complaintsByStatus.Assigned || 0) +
          (this.complaintsByStatus.Done || 0);

        // Debugging: Log the calculated "This Week" complaints
        console.log('Total complaints for this week:', this.dashboardMetrics.thisWeekComplaints);

        // Fetch resolved after week and this week complaints
        this.dashboardMetrics.resolvedAfterWeek = data.resolvedAfterWeek || 0;

        // Log the resolved after week data
        console.log('Resolved after a week:', this.dashboardMetrics.resolvedAfterWeek);

        this.renderBarChart();
      },
      (error) => {
        console.error('Error fetching dashboard metrics:', error);
      }
    );
  }

  renderBarChart(): void {
    const ctx = document.getElementById('complaintsBarChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Logged', 'Assigned', 'Done'],
        datasets: [
          {
            label: 'Complaints Count',
            data: [
              this.complaintsByStatus.Logged || 0,
              this.complaintsByStatus.Assigned || 0,
              this.complaintsByStatus.Done || 0,
            ],
            backgroundColor: ['#8B4513', '#D2B48C', '#F5DEB3'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
