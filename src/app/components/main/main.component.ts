import { Component, OnInit } from '@angular/core';
import { Assessments } from 'src/app/interfaces/assessments';
import { GraphData } from 'src/app/interfaces/graph';
import { User} from 'src/app/interfaces/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  assessments: Assessments[] = [];
  isGraphOpen: boolean = false;

  selectedId: number = 0;
  usersList: User[] = [];
  userIds: number[] = [];
  graph!: GraphData;
  chartOptions: any;

  constructor(private apiService: ApiService) {
    apiService.getUsers().subscribe(users => {
      this.usersList = users;
    })
  }

  ngOnInit(): void {
    this.apiService.getUserAssessments().subscribe(res => {
      this.assessments = res;
      this.userIds = this.assessments.map(assessment => assessment.id);
    });
  }

  openGraph(userId: number) {
    this.isGraphOpen = !this.isGraphOpen;
    this.selectedId = userId;
    this.apiService.getGraph(userId).subscribe(res => {
      this.graph = res;
      const data = Object.entries(this.graph.data)
      .map(([key, value]) => ({ label: key, y: value }));

      this.chartOptions = {
        title: {
          text: "Graph"
        },
        data: [{
          type: "column",
          dataPoints: data
        }]
      };
    });
  }
}
