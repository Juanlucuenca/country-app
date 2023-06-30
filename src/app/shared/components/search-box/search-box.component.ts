import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import {pipe, Subject, debounceTime, Subscription} from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy  {
  private debauncerSuscription?: Subscription;
  private debouncer: Subject<string> = new Subject<string>()

  @ViewChild('txtSearchImput') public txtSearchImputRef!: ElementRef

  @Input()
  public placeHolder: string = ''

  @Input()
  public initialValue: string = ''

  @Output()
  public onEnterKeyPressed: EventEmitter<string> = new EventEmitter()

  @Output()
  public onDebaunce: EventEmitter<string> = new EventEmitter()
 
  ngOnInit(): void {
    this.debauncerSuscription = this.debouncer
    .pipe (
      debounceTime(600)
    )
    .subscribe(value => {
      this.onDebaunce.emit( value )
    })
  }

  ngOnDestroy(): void {
    this.debauncerSuscription?.unsubscribe()
  }

  emitValue( value: string ) {
    this.onEnterKeyPressed.emit( value )
  }

  onKeyPress( searchTerm: any ) {
    this.debouncer.next( searchTerm )
  }
  
}

