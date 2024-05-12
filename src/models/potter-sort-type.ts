export enum PotterSortType {
  TITLE_ASC = 'title.ASC',
  TITLE_DESC = 'title.DESC',
  RATING_ASC = 'vote_average.ASC',
  RATING_DESC = 'vote_average.DESC',
  RELEASE_DATE_ASC = 'release_date.ASC',
  RELEASE_DATE_DESC = 'release_date.DESC',
}

export const SORT: Record<PotterSortType, string> = {
  [PotterSortType.TITLE_ASC]: 'Title (A-Z)',
  [PotterSortType.TITLE_DESC]: 'Title (Z-A)',
  [PotterSortType.RATING_ASC]: 'Never see again',
  [PotterSortType.RATING_DESC]: 'Best first',
  [PotterSortType.RELEASE_DATE_ASC]: 'Release date (oldest first)',
  [PotterSortType.RELEASE_DATE_DESC]: 'Release date (newest first)',
};
