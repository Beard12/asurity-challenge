export interface Loan {
    actionTakenType: ActionTakenType
    agencyCode: AgencyCode
    amortizationType: AmortizationType
    applDate: Date
    apr: number
    latitude: number
    loanAmount: number
    loanId: string
    loanPurpose: LoanPurpose
    loanTerm: number
    loanType: LoanType
    lockInDate: Date
    longitude: number
    rateSpread: number
    reverseMortgage: number
}

enum LoanPurpose {
    HomePurchase = 1,
    HomeImprovement,
    Refinancing
}

enum LoanType {
    Conventional = 1,
    FHAInsured,
    VAGuaranteed,
    FSARHSGuaranteed
}

enum AgencyCode {
    OCC = 1,
    FRS = 2,
    FDIC = 3,
    NCUA = 5,
    HUD = 7,
    CFPB = 9
}

enum ActionTakenType {
    Originated = 1,
    ApplicationApproved = 2,
    PreApproval = 8
}

export enum AmortizationType {
    VariableRate = "Variable Rate",
    FixedRate = "Fixed Rate"
}