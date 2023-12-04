import tw from 'tailwind-styled-components';
import { useState } from 'react';
import { useEffect } from "react";
import { ImCross } from "react-icons/im";
import axios from 'axios';
import { getAllProjectNames, newIssue, newProjectName } from '../api';

const SubmitIssue = ({ setShow }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Open");
    const [severity, setSeverity] = useState("Low");
    const [selectedProject, setSelectedProject] = useState("");
    const [project, setProject] = useState("");

    const handleStatusChange = (val) => {
        setStatus(val);
    }

    const handleSeverityChange = (val) => {
        setSeverity(val);
    }

    const setProjectName = async () => {
        const {data} = await axios.post(newProjectName, {
            project
          });
          console.log(data);
    }

    const handleButtonCLick = async () => {
        if (projectNames.length <= 0) {
            alert("select project");
            return;
        }

        // Basic validation
        if (!title || !description || !status || !severity) {
            console.error('Please fill in all fields and select a file.');
            return;
        }

        let projectname;
        let id = user._id;
        if (project.length > 0) {
            setProjectName();
            projectname =  project;
        }else{
            projectname = selectedProject;
        }

        try {
            const {data} = await axios.post(newIssue, {
                title, description, status, severity,id, projectname
            }
);

            console.log(data);

        } catch (error) {
            console.error('Error uploading file', error);
        }
        setStatus("Open");
        setSeverity("Low");
        setTitle("");
        setDescription("");
        if (project.length > 0) {
            setProject("");
        }
        setShow(false);
    };

    const [projectNames, setProjectNames] = useState([]);

    const getProject = async () => {

        const { data } = await axios.get(getAllProjectNames);
        setProjectNames(data[0].projectNames);
        console.log(data[0].projectNames)
    }

    const [user, setUser] = useState([]);

    useEffect(() => {
        getProject();
        if (localStorage.getItem("current-user")) {
            setUser(JSON.parse(localStorage.getItem("current-user")).user);
        }
    }, []);

    return (
        <Wrapper>
            <div className='flex flex-col gap-4 px-4 py-4 bg-white rounded-md shadow-md relative w-1/4 h-fit'>

                <div className='flex flex-col gap-2'>
                    <h2 className='text-center font-bold text-sky-600'>Select Project</h2>
                    {projectNames && projectNames.map((name) => (
                        <p key={name} className={` bg-[#57b6f0] text-white text-sm p-2  rounded-md cursor-pointer ${selectedProject == name ? "bg-opacity-100" : "bg-opacity-30"}`} onClick={() => setSelectedProject(name)}>{name}{console.log(name)}</p>
                    
                    ))}

                    {console.log(selectedProject)}
                </div>
            </div>
            <Form onSubmit={(e) => e.preventDefault()}>

                <div onClick={() => setShow(false)} className='absolute right-2 top-4 text-[#666] text-sm'><ImCross /></div>

                <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' required />

                {user && user.role == "admin" ? (
                    <Input value={project} onChange={(e) => setProject(e.target.value)} type="text" placeholder='Project Name' required />
                ) : null}
                <Description value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description"></Description>
                <Select>
                    <Label>
                        Status
                    </Label>
                    <List className='gap-3'>
                        <Option className={`${status == "Open" ? "bg-[#57b6f0] bg-opacity-20 p-1 rounded-full" : "p-1 rounded-full"}`} onClick={() => handleStatusChange("Open")} title='Open'><div className='cursor-pointer bg-[#83bf6e] rounded-full w-4 h-4'></div></Option>
                        <Option className={`${status == "In Progress" ? "bg-[#57b6f0] bg-opacity-20 p-1 rounded-full" : "p-1 rounded-full"}`} onClick={() => handleStatusChange("In Progress")} title='In Progress'><div className='cursor-pointer bg-[#d9b641] rounded-full w-4 h-4'></div></Option>
                        <Option className={`${status == "Close" ? "bg-[#57b6f0] bg-opacity-20 p-1 rounded-full" : "p-1 rounded-full"}`} onClick={() => handleStatusChange("Close")} title='Close'><div className='cursor-pointer bg-[#d94841] rounded-full w-4 h-4'></div></Option>
                    </List>
                </Select>

                <Select>
                    <Label>
                        Severity
                    </Label>
                    <List className='gap-3'>
                        <Option className={`${severity == "Low" ? "bg-[#57b6f0] bg-opacity-20 p-1 rounded-full" : "p-1 rounded-full"}`} onClick={() => handleSeverityChange("Low")} title='Low'><div className='cursor-pointer bg-[#83bf6e] rounded-full w-4 h-4'></div></Option>
                        <Option className={`${severity == "Medium" ? "bg-[#57b6f0] bg-opacity-20 p-1 rounded-full" : "p-1 rounded-full"}`} onClick={() => handleSeverityChange("Medium")} title='Medium'><div className='cursor-pointer bg-[#d9b641] rounded-full w-4 h-4'></div></Option>
                        <Option className={`${severity == "High" ? "bg-[#57b6f0] bg-opacity-20 p-1 rounded-full" : "p-1 rounded-full"}`} onClick={() => handleSeverityChange("High")} title='High'><div className='cursor-pointer bg-[#d94841] rounded-full w-4 h-4'></div></Option>
                    </List>
                </Select>

                <Button onClick={handleButtonCLick}>Add Issue</Button>
            </Form>
        </Wrapper>
    )
}

const Wrapper = tw.div`w-full p-4 flex flex-row-reverse justify-between gap-4`;
const Form = tw.form`flex flex-col gap-4 px-4 pb-6 pt-12 bg-white rounded-md shadow-md relative w-full`;
const Input = tw.input`bg-[#6a7185] bg-opacity-5 placeholder:text-[#999] placeholder:font-semibold text-lg tracking-wide p-3 rounded-md shadow-inner focus:outline-none`
const Select = tw.div`flex justify-between items-center`;
const Label = tw.h1`text-xs tracking-wide font-semibold blue rounded-md py-1 px-2 bg-[#57b6f0] bg-opacity-10`;
const List = tw.ul`flex gap-2 items-center`;
const Option = tw.li``;
const Description = tw.textarea`bg-[#6a7185] bg-opacity-5 placeholder:text-[#999] placeholder:font-semibold text-lg tracking-wide p-3 rounded-md shadow-inner capitalize focus:outline-none`;
const Button = tw.button`bg-[#1B77F2] text-white p-3 rounded-md`;

export default SubmitIssue
