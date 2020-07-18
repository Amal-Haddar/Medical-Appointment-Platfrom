export interface Idisponibility {
  _embedded: {
    disponibilites: [
      {
        id: number;
        title: string;
        start: Date;
        end: Date;
      }
    ];
  };
}
