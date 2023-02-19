import { Component, ViewChild } from '@angular/core';
import {
  Validators,
  NgForm,
  FormGroup,
  FormControl,
  FormBuilder,
} from '@angular/forms';

interface IsalesTaxArray {
  id: number;
  title: string;
  value: number;
}

interface items {
  id: number;
  name: string;
  items: [
    {
      id: number;
      name: string;
      glCode: number;
      amount: number;
      salesTax: IsalesTaxArray;
    }
  ];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  totalAmount: number = 0;
  totalTaxes: number = 0;

  itemsTitles = [
    'Category',
    'Items',
    'Gl Code',
    'Amount',
    'Sales Tax',
    'Total',
  ]

  localItems: items[] = [
    {
      id: 1,
      name: 'Category 1',
      items: [
        {
          id: 1,
          name: 'item 1',
          glCode: 0,
          amount: 0,
          salesTax: { id: 0, title: '', value: 0 },
        },
      ],
    },
  ]

  salesTaxArray: IsalesTaxArray[] = [
    { id: 1, title: 'No tax', value: 0 },
    { id: 2, title: 'USA', value: 10 },
    { id: 3, title: 'Germany', value: 12 },
  ]

  ngOnInit() {
    this.localItems[0].items[0].salesTax = this.salesTaxArray[0];
  }

  submitForm(myForm: NgForm) {
    console.log(myForm);
  }

  addCategory() {
    this.localItems.push({
      id: -new Date().getTime(),
      name: 'Category',
      items: [
        {
          id: -new Date().getTime(),
          name: 'Item',
          glCode: 0,
          amount: 0,
          salesTax: { id: 0, title: '', value: 0 },
        },
      ],
    });
  }

  removeCategory(id: number) {
    const idx = this.localItems.findIndex((item) => item.id === id);

    if (idx !== -1) {
      this.localItems.splice(idx, 1);
    }
  }

  addItemToCategory(catId: number) {
    this.localItems.find((category) => {
      if (category.id === catId) {
        category.items.push({
          id: -new Date().getTime(),
          name: 'Item',
          glCode: 0,
          amount: 0,
          salesTax: { id: 0, title: '', value: 0 },
        });
      }
    });
  }

  removeItemFromCategory(catId: number, itemId: number) {
    this.localItems.find((category) => {
      if (category.id === catId) {
        const idx = category['items'].findIndex((item) => item.id === itemId);
        if (idx !== -1) {
          category['items'].splice(idx, 1);
        }
      }
    });
  }

  getTotalAmount(isAmount: boolean) {
    let total = 0;
    this.localItems.forEach(item => {
      total = item.items.reduce((acc, curr) => {
        if (isAmount) {
          return +acc + +curr.amount;
        }
        return +acc + +curr.salesTax.value;
      }, total)
    });

    if (isAmount) this.totalAmount = total;
    else this.totalTaxes = total;
  }

  // constructor(private formBuilder: FormBuilder) {
  //   this.myForm = this.formBuilder.group({
  //     name: [''],
  //     age: ['22'],
  //     profession: [''],
  //   });
  // }
  // myForm!: FormGroup;

  //реактивная форма
  // myForm: FormGroup = new FormGroup({
  //   name: new FormControl('Денис'),
  //   age: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
  //   profession: new FormControl(''),
  // })

  // @ViewChild('myForm') form!: NgForm;
  // sumbitForm(form: NgForm) {
  //   console.log(form.value);
  //   form.reset();
  // }
  // sumbitForm() {
  //   console.log(this.form.value);
  //   this.form.reset();
  // }

  // sumbitForm() {
  //   console.log(this.myForm.value);
  //   this.myForm.reset();
  // }
}
