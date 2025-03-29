import inquirer from "inquirer";
import { execSync } from "child_process";

async function setupProject() {
    console.log("\n🚀 Welcome to the Custom Project Setup CLI!\n");

    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "framework",
            message: "Which framework would you like to use?",
            choices: ["React", "Vue", "Angular"],
        },
        // {
        //     type: "confirm",
        //     name: "useTailwind",
        //     message: "Would you like to include Tailwind CSS?",
        //     default: true,
        // },
        {
            type: "input",
            name: "projectName",
            message: "Enter your project name:",
            validate: (input) => (input ? true : "Project name cannot be empty!"),
        },
    ]);

    const { framework, /*useTailwind,*/ projectName } = answers;

    console.log(`\n🔧 Setting up a ${framework} project: ${projectName}...\n`);

    switch (framework) {
        case "React":
            execSync(`npx create-next-app@latest ${projectName} --ts --eslint --app --use-npm`, { stdio: "inherit" });
            process.chdir(projectName);
            console.log("\n📦 Installing ShadCN UI, Lucide React, and Axios...\n");
            execSync("npm install @shadcn/ui lucide-react axios", { stdio: "inherit" });
            break;
        case "Vue":
            execSync(`npx create-vite@latest ${projectName} --template vue-ts`, { stdio: "inherit" });
            break;
        case "Angular":
            execSync(`npx @angular/cli new ${projectName} --style=scss --routing`, { stdio: "inherit" });
            break;
    }

    // Install Tailwind if needed (Post-creation)
    // if (useTailwind) {
    //     console.log("\n🎨 Installing Tailwind CSS...\n");
    //     execSync("npm install -D tailwindcss postcss autoprefixer", { stdio: "inherit" });
    //     execSync("npx tailwindcss init -p", { stdio: "inherit" });
    // }

    console.log("\n✅ Project setup complete! Happy coding! 🚀\n");
}

setupProject();