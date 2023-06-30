import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {
  
  public countries: Country[] = []
  public isLoading: boolean = false


  constructor(private contryService: CountriesService) {}

  public initialValue: string = ""

  ngOnInit(): void {
    this.initialValue = this.contryService.cacheStore.byCapital.term
    this.countries = this.contryService.cacheStore.byCapital.countries
  }

  searchByCapital( term: string ): void {
    this.isLoading = true
    this.contryService.searchByCapital(term)
    .subscribe( countries => {
      this.countries = countries
      this.isLoading = false
    })
  }


}
