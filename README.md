# Micron
**A peer to peer microtransactions network**

Simple web-based banking application that allows a user to register and send (fake) money to another user. 

## Main Features


### Create an account

Anonymous authentication is used to tie the current device to a User uuid. 

Doing so, **we require no password** as the user's device is the only one that can carry out money transfers.

### Send dummy (fake) currency from one account to another

By using a **Cryptographic key (UUID-V4)** we provide the user with a 2-way authentication system. 

In the future, the UUID string can easily be replaced by a QR sent by email.


### Check account balance

The Transfer Collection is designed as an **insert-only Ledger**, doing so we guarantee the integrity of the transaction history and thus the user's balance.

To preserve privacy to direct reading is allowed by the users to the Ledger & only an aggregation can be consumed.




## Learn More


### Tech Stack

**Front End**: React / Bulma

**DB**: MongoDB Stitch & Functions

**Hosting**: Netlify/ GitLab

The stacked was used to provide the most possible value in a 24 hour time-frame.

The design of the application was inspired by BlockChain & AWS Quantum Ledger DB.


### Testing

Tests were defined & run manually. They could be split like so:

Unit Tests: Assert correct configuration of Indexes & DB Security Rules.

Integration Tests: Run for each one of the three main views of the application.

E2E Test: Sign-up, transfer money to another account & validate transfer balance for each account.


### Security

There are two collections that support the app: Users & Transfers, both collections are insert-only.

The user collection has the following fields: id, user_id, crypto_key & unique_name. It has an unique-index in each field to prevent duplicates.

The crypto_key attribute is not readable by the client, the user_id is only readable by owner user and is generated when connecting to the DB. 

Finally, the list of unique_users is public and used to send money transfers, while the ledger DB is completely handled by the server.


### Next Steps

* Resolve negative account balances by either: allowing money to go in & out of the system, or develop a credit system.
* Tests need to be carried out to guarantee the longevity of the user_id in the browser. A mechanism to recover accounts also needs to be developed.
* Improve data modeling & security by using a real ledger DB and set "trust scores" to each transaction via graph algorithms.
* Product & market fit should be assesed by monitoring the user's iteraction with the application. 
* Validate idea with domain expertes and develop a business model.
* Increase UX by using QR & improving style.



### Contact
Santiago M.

*santiago.marti67@gmail.com*
