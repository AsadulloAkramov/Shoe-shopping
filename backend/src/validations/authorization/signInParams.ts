export class SignInParams {
  /**
   * FirstName 
   * @name firstName
   * @type string
   * @example Asadullo
   */
  firstName!: string;

   /**
   * FirstName 
   * @name lastName
   * @type string
   * @example Akramov
   */
  lastName!: string;

   /**
   * FirstName 
   * @name email
   * @type string
   * @format email
   * @example asadullo@gmail.com
   */
  email!: string
 
  password!: string
}