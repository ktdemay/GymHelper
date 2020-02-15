## Basic Plan
* JavaScript
* Mock-up fake "real-world" test
  * UI of how busy it is
  * Can generate random amount of people, wait
  * Show how the app works vs. real world test
  * To test it out, since we don't have actual data from Pitt api, we make up data to test
    * Day in the year due to midterms, holidays, summer term, etc.
* Back-end
  * Average person goes to gym 40-60 minutes
  * Every time a person swipes in, add a person to the current attendance counting down from 50 minutes, or possible a random number between 40-60
  * Generate a chart that shows how busy the place will be based on machine availability and estimate of people in attendance
    * Can base business off of historical average
 * Other additions
   * Gym hours
* Counting system
  * Person class
  * Hash of every minute the gym is open.
    * Array of every minute in 24 hours, with the key being the current minute, and the value being how many people are leaving at that time. 
  * At the minute a person swipes in, increment number of people leaving at that time + 50 minutes (or variable time if we add it)
  * Increment total number of people when swiped in
  * Poll every minute. Check hash table of that minute and decrement total number of people by the value in the hash

  * Potential additions: