import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  
  @HostBinding('class.open')
  isOpen:boolean = false;

  @HostListener('click')
  toggleOpen(){
    this.isOpen=!this.isOpen;
  }

  // @HostListener('mouseleave')
  // onMoseLeave(){
  //   this.isOpen=false;
  // }

}
