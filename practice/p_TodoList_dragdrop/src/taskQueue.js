export default function TaskQueue() {
  const tasks = []

  this.addTasks = (task) => {
    this.tasks.push(task)
    console.log(tasks)
  }

  this.run = async () => {
    if (tasks.length > 0) {
      const task = tasks.shift()
      await task()
      this.run()
    }
  }
}