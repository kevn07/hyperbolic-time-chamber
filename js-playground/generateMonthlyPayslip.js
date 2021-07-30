/*
  Code By: Kevin He
  Description:
    employeePaySlipOrchestrator calculates an employees:
      - gross monthly income
      - monthly income tax
      - net monthly income
    given:
      - full name
      - annual salary
    
  Requirements: 
    - Javascript runtime environment (NodeJS)

  How to Run:
    1. In terminal or IDE run file with command line arguments:
      node generateMonthlyPayslip.js "<employee name>" <annual salary>
      eg.
        node generateMonthlyPayslip.js "Mary Song" 60000

  Assumptions:
    - Annual Salary must be greater than $0 
    - Taxable income and tax on income are susceptible to change in the future
*/

class employeePayslipOrchestrator {
  constructor(_name, _annualSalary, _taxableIncome, _tax) {
    if (_annualSalary <= 0) {
      throw new Error('Annual Salary cannot be less than 0')
    }
    this.name = _name
    this.annualSalary = _annualSalary
    this.taxableIncome = _taxableIncome
    this.tax = _tax
  }

  grossMonthlyIncome(_annualSalary) {
    const annualSalary = _annualSalary || this.annualSalary
    return annualSalary / 12
  }

  monthlyIncomeTax(_annualSalary, _taxableIncome, _tax) {
    const tax = _tax || this.tax
    const taxBrackets = _taxableIncome || this.taxableIncome
    let salary = _annualSalary || this.annualSalary
    let taxIncrements = []
    taxBrackets.forEach((currentValue, index) => {
      index !== 0 ? taxIncrements.push(currentValue -= taxBrackets[index - 1]) : taxIncrements.push(currentValue)
    });

    // if salary is less than the initial income bracket
    if (salary <= taxBrackets[0]) {
      return salary * tax[0]
    }

    let index = 0
    let totalIncomeTax = 0;

    // calculate totalIncomeTax when annual income <= final income bracket
    while (index < tax.length - 1) {
      if (salary > taxIncrements[index]) {
        totalIncomeTax += taxIncrements[index] * tax[index]
        salary -= taxIncrements[index]
      } else {
        totalIncomeTax += salary * tax[index]
        break
      }
      index += 1
    }

    // if salary is greater than final income bracket
    if (index >= tax.length - 1 && salary > 0) {
      totalIncomeTax += salary * tax[index]
    }

    return totalIncomeTax / 12
  }

  netMonthlyIncome(_grossMonthlyIncome, _monthlyIncomeTax) {
    const grossMonthlyIncome = _grossMonthlyIncome || this.grossMonthlyIncome()
    const monthlyIncomeTax = _monthlyIncomeTax || this.monthlyIncomeTax()
    return grossMonthlyIncome - monthlyIncomeTax
  }

  generateMonthlyPayslip() {
    const grossMonthlyIncome = this.grossMonthlyIncome()
    const monthlyIncomeTax = this.monthlyIncomeTax()
    const netMonthlyIncome = this.netMonthlyIncome()
    console.log(`Monthly Payslip for: ${this.name}`)
    console.log(`Gross Monthly Income: $${grossMonthlyIncome.toFixed(2)}`)
    console.log(`Monthly Income Tax: $${monthlyIncomeTax.toFixed(2)}`)
    console.log(`Net Monthly Income: $${netMonthlyIncome.toFixed(2)}`)
  }
}

function ignite() {
  const fullName = process.argv[2]
  const salary = parseFloat(process.argv[3])
  const taxableIncome = [20000, 40000, 80000, 180000]
  const tax = [0, 0.1, 0.2, 0.3, 0.4]
  const employeePayslip = new employeePayslipOrchestrator(fullName, salary, taxableIncome, tax)
  employeePayslip.generateMonthlyPayslip()
}

ignite()