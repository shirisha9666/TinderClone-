import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const {loading,signup}=useAuthStore()
 
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        signup({name,email,password,age,gender,genderPreference});
      }}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500
        focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500
        focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500
        focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <div className="mt-1">
          <input
            id="age"
            name="age"
            type="number"
            required
            value={age}
            // min="18"
            // max="20"
            onChange={(e) => setAge(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500
        focus:border-pink-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label
          className="
        block text-sm font-medium text-gray-700"
        >
          Your Gender
        </label>
        <div className="mt-2 flex gap-2">
          <div className="flex items-center">
            <input
              id="female"
              name="gender"
              type="checkbox"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="h-4 w-4 text-pink-600 
          focus:ring-pink-500 border border-gray-300 cursor-pointer
           rounded"
            />
            <labe htmlFor="female" className="ml-2 block text-sm text-gray-900">
              Female
            </labe>
          </div>
          <div className="flex items-center">
            <input
              id="male"
              name="gender"
              type="checkbox"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="h-4 w-4 text-pink-600 
          focus:ring-pink-500 border border-gray-300 cursor-pointer
           rounded"
            />
            <labe htmlFor="male" className="ml-2 block text-sm text-gray-900">
              Male
            </labe>
          </div>
        </div>
      
      </div>
        {/* gender preparence */}
        <div>
          <label
            className="
        block text-sm font-medium text-gray-700 my-2"
          >
            Prefer me
          </label>
          <div className="flex items-center ">
            <input
              id="male"
              name="gender-preference"
              type="radio"
              value="male"
              checked={genderPreference === "male"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500
 border border-gray-300 cursor-pointer"
            />
            <label
              htmlFor="male"
              className="ml-1 block text-sm
 text-gray-900"
            >
              Male
            </label>
          </div>
          <div className="flex items-center my-2">
            <input
              id="female"
              name="gender-preference"
              type="radio"
              value="female"
              checked={genderPreference === "female"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500
 border border-gray-300 cursor-pointer"
            />
            <label
              htmlFor="prefer-both"
              className="ml-1 block text-sm
 text-gray-900"
            >
              female
            </label>
          </div>
          <div className="flex items-center ">
            <input
              id="prefer-both"
              name="gender-preference"
              type="radio"
              value="both"
              checked={genderPreference === "both"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500
 border border-gray-300 cursor-pointer"
            />
            <label
              htmlFor="prefer-both"
              className="ml-1 block text-sm
 text-gray-900"
            >
              Both
            </label>
          </div>
        </div>
        <div>
          <button type="submit"  className={`w-full flex justify-center py-2
            px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
            ${loading?"bg-pink-400 cursor-not-allowed":"bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:offset-ring-2 focus:ring-pink-500"} text-white`}
            disabled={loading}>{loading?"Signing up...":"Sign up"}</button>
        </div>
    </form>
  );
};

export default SignUpForm;
