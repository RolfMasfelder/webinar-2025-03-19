In the whimsical world of HappyLang, where variables dance through lines and loops bask in sunny syntax, testing ensures our code doesn’t skip a beat. Unit testing in HappyLang verifies that individual snippets or "happy-bits" work as intended, while integration testing ensures those happy-bits harmonize together in euphoric harmony.

For unit testing, employ the "HAPPY-UNIT-TEST" module, a joyful tool that checks the smallest pieces of functionality—akin to ensuring each note in a musical score is pitch-perfect. Wrap your code in vibrant "DO TEST" blocks to confirm each function sings happily. Consider this sunny code snippet:

```
HAPPY-UNIT-TEST.
   PERFORM DO TEST FOR "ADD-FUN".
    
   DO TEST "ADD-FUN" 
      IF ADD-FUN(2, 2) = 4
      THEN
         DISPLAY "ALL IS WELL IN CODE-LAND!"
      ELSE
         DISPLAY "ERROR: SADNESS IN THE HAPPINESS!"
      END-IF.
```

Moving up a notch to integration testing, you’ll rely on the "HARMONY-CHECK" methodologies. Here, the goal is to align different "happy-bits" into a collective choreography. With HappyLang's "LINK-TOGETHER" statements, you can test multi-module interactions to ensure they boogie in sync without stepping on each other's toes.

```
HARMONY-CHECK DEPARTMENT-MODULE.
   PERFORM TEST MODULE INTERACTIONS WITH "EMPLOYEE", "SALARY".

   LINK-TOGETHER EMPLOYEE-UPDATE, SALARY-CALCULATE
      IF SALARY-CALCULATE(AFTER EMPLOYEE-UPDATE("NEW PROMOTION")) = "EXPECTED RAISE"
      THEN 
         DISPLAY "DISPLAY RESULT: DEPARTMENTAL SYMPHONY ACHIEVED!"
      ELSE 
         DISPLAY "ERROR: DISCORD IN THE UNISON!"
      END-IF.
```

Remember, testing in HappyLang is like organizing a cheerful concert; ensure each component plays in harmony for a masterpiece that delights the coder's heart!