#include <stdio.h>

int main()
{
	// this simply makes sure bytes arrive at your end
	// and dont get stuck in a buffer.
	setvbuf(stdout, NULL, _IONBF, 0);



	// challenge relevant code starts here
	char name[128];
	char flag[32] = " ** redacted ** ";

	printf("Enter your name:\n");
	fgets(name, 128, stdin);

	printf("Hello ");
	printf(name);

	printf("Bye!\n");
	return 0;
}
