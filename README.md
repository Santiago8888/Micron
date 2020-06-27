# Micron
**A peer to peer microtransactions network**

Simple web-based banking application that allows a registered user to send dummy currency to another user. 

The application uses a two-factor authentication protocol, that enables safe transfers and a private method to check their balance.

## [Demo](https://micron.netlify.app/) 
https://micron.netlify.app/

**MVP flow:**
1. Create an account with a unique username.
2. Store safely the secret hash.
3. Transfer money and check the updated balance.
4. Create a second account and test the transfer balance (Optional).

## Main Features


### Create an account

Anonymous authentication is used to tie the current device session to a User uuid. 

Doing so, **we require no password** as the user's device is the only one that can carry out money transfers.

### Send dummy currency from one account to another

By using a **Cryptographic key (UUID-V4)** we provide the user with a 2-way authentication system. 

In the future, the UUID string can be replaced by a QR sent via email.


### Check account balance

The Transfer Collection is designed as an **insert-only Ledger**, thus, we guarantee the integrity of the transaction history and the user's balance.

To preserve privacy, direct reading of the Ledger is not allowed for the users & only an aggregation can be consumed.




## Learn More


### Tech Stack

**Front End**: React / Bulma

**DB**: MongoDB Stitch & Functions

**Hosting**: Netlify/ GitLab

The stacked was used to provide the most possible value in a 24 hour time-frame.

The design of the application was inspired by BlockChain techonology & the AWS Quantum Ledger DB.


### Testing

Tests were defined & run manually. A path to automatize them, would look:

Unit Tests: Assert correct configuration of Indexes & DB Security Rules.

Integration Tests: For each one of the three main views of the application.

E2E Test: Sign-up, transfer money from one account to another & validate the balance for each account.


### Security

There are two collections that support the app: Users & Transfers, both collections are insert-only.

The user collection has the following fields: id, user_id, crypto_key & unique_name. It has an unique-index in each field to prevent duplicates.

The crypto_key attribute is not readable by the client, the user_id is only readable by the owner user and is generated when first connecting to the DB.

Finally, the list of unique_users is public and used to send money transfers. 

The ledger DB, i.e. transfers collection, is completely handled by the server.


### Next Steps

* Resolve negative account balances by either: create a protocol that allows money to go in & out of the system, else, develop a credit system (second one is prefered).
* Improve the life-span of the user_id in the browser session, and develop a mechanism to recover accounts.
* Strengthen security by using a blockchain DB, then validate the feasibility for each transaction via graph algorithms.
* Assess product & market fit by installing Product Intelligence software (Amplitude). 
* Validate idea with domain expertes in banking & security, then develop a business model.
* Enhance UX by using a QR mobile code, improve style and a mobile first approach.



### Contact
[*Santiago M.*](https://www.linkedin.com/in/santiagoqu/)

## Run Locally
``yarn install``

``yarn start``
