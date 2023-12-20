export interface Highlights {
  fieldName: string;
  fragments: Fragment[];
}

interface Bucket {
  start: number;
  length: number;
}

export interface Fragment {
  referenceId?: string;
  start?: number;
  length?: number;
  text?: string;
  string?: string; // for old values
  ignoreText?: boolean;
  ignoreCase?: boolean;
  matchKeywordList?: Bucket[]; // to highlight multiple keywords in a one fragment text
}
