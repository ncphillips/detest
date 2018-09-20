Detest is Testing Framework. 

## The Detest Core 

Detest consists of 4 core classes:

* Test
* Context
* TestRunner
* TestRUnnerListener

Test represents an indivudal test on your system. It has a description, 
a status, and function to execute.

Context represents a grouping of Tests. Contexts may also be nested.

The TestRunner is what actually executes the the Tests in your project.

TestRunnerListeners are objects which watch for events 
coming from the TestRunner. These include things like loggers 
and analytics tools.

## The Describe-It API 

It is not recommended that you use the Detest Core to write your
tests. Instead, you can use the Describe-It API. This provides a 
functional API for describeing your tests.


