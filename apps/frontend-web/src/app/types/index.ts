export interface Recipe {
  _id: string;
  name: string;
  title: string;
  image_url: string;
  prep_time: string;
  calories: number;
  calories_per_serving: number;
  servings: number;
  dietaryRestrictions?: string[];
  dietary_restrictions: string[];
  instructions: string;
  difficulty?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
