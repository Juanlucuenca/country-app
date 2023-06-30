import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = []
  public isLoading: boolean = false
  public regions: Region[] = ['africa', 'americas', 'asia', 'europe', 'oceania']
  public selectedRegion?: Region | String; 

  constructor(private contryService: CountriesService) { }

  ngOnInit(): void {
    this.selectedRegion = this.contryService.cacheStore.byRegion.term
    this.countries = this.contryService.cacheStore.byRegion.countries
  }


  searchByRegion( term: Region ): void {
    this.selectedRegion = term
    this.isLoading = true
    this.contryService.searchByRegion(term)
    .subscribe( countries => {
      this.countries = countries
      this.isLoading = false
    })

  }

}
