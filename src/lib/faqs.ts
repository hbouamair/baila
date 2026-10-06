export type FaqItemView = {
  id: string
  question: string
  answer: string
}

export type FaqGroupView = {
  id: string
  label: string
  items: FaqItemView[]
}
