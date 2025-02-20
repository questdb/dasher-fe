# QuestDB front-end work sample

Hey!

Thanks for your interest in joining the team.

The following is designed to take about 2-4 hours.

Or "one solid working block".

There is no deadline.

However, we do have lots of folks applying, so keep that in mind!

Time is of the essence.

## The task

This exercise is designed to mirror a realistic dev scenario.

There is a NextJS app with a base page, an API, and a view.

The view is located at `localhost:3000/audit`.

Your mission:

1. Get the app running
2. Update the Auditor UI to handle more rows
 - Can you handle 1000 rows? 100k? 1.5B?
3. (Stretch goal) Generate stats using row data
 - Hint: _QuestDB queries_

1000 rows is no problem, but after 100k things get dicey.

The DOM will explode, and it looks like our table won't cut it.

How can we improve this? Performance is key!

The API, view, and whatever else is yours to edit.

You can direct real-time queries at the live [QuestDB demo instance](https://demo.questdb.io).

Be mindful of performance, efficiency, and failure when the queries returns a large data set!

Look for `@TODO`!

## Evaluation

We are evaluating:

1. How you handle the rows
2. How you constructed your "table"
3. Did you handle stats? How?
4. How you package the PR

There is also an **optional** [THOUGHTS.md](thoughts.md) page.

As you go, feel free to write any interesting thoughts.

If you have any questions, please reach out to us!

## Submission

To submit:

1. **Clone the repo**
   ```sh
   git clone https://github.com/questdb/dasher-fe.git
   cd dasher-fe
   ```

2. **Create a new branch**
   ```sh
   git checkout -b my-solution
   ```

3. **Implement your solution**

4. **Commit your changes**
   ```sh
   git add .
   git commit -m "My solution"
   ```

5. **Generate a patch file**
   ```sh
   git format-patch main --stdout > my-solution.patch
   ```
   - This creates a patch file with all changes made since the `main` branch.
   - Alternatively, if you want to submit only your last commit:
     ```sh
     git format-patch -1 HEAD --stdout > my-solution.patch
     ```

6. **Submit your patch**
   - Email us `my-solution.patch`!

### ⚠️ Important Notes
- Please **do not** push your solution to a public repository
- Ensure your patch file includes only necessary changes

Good luck! 🚀
