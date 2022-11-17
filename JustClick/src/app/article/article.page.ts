import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  newsData: any;
  newsArticles: Array<any> = [];
  apiUrl: string;
  constructor(private httpClient: HttpClient, private navCtrl: NavController,) { }
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay:t
  }

  ngOnInit() {
    this.apiUrl = 'https://raw.githubusercontent.com/zawaneemakeng/BasicAPI/main/data.json';
    this.httpClient.get(this.apiUrl).subscribe(data => {
      this.newsData = data;
      this.newsArticles = this.newsData;
    });
  }
  actionPage() {
    this.navCtrl.navigateForward('details-a');
  }

}
