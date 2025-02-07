import React from 'react'

const form2 = () => {
  return (
    <div role="main" className="form-all">
      <form onSubmit={handleSubmit}>
        <ul className="form-section page-section" role="presentation">
          <li id="cid_1" className="form-input-wides">
            <div className="form-header-group header-small">
              <div className="header-text">
                <h3 id="header_1" className="form-header">
                  Student Registration Form
                </h3>
              </div>
            </div>
          </li>

          <ul className="form-section">
            <li className="form-line" data-type="control_fullname" id="id_4">
              <label htmlFor="name" className="form-label">Full Name</label>
              <div className="form-input-wides">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-textbox"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </li>

            <li className="form-line">
              <label htmlFor="number" className="form-label">Student Number</label>
              <div className="form-input-wides">
                <input
                  type="text"
                  id="number"
                  name="rn"
                  className="form-textbox"
                  value={formData.rn}
                  onChange={handleChange}
                  maxLength="10"
                  placeholder="e.g. 11183021"
                />
              </div>
            </li>

            <li className="form-line">
              <label htmlFor="year" className="form-label">Year Level</label>
              <div className="form-input-wides">
                <select
                  id="year"
                  name="year"
                  className="form-dropdown"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Please Select</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                </select>
              </div>
            </li>

            <li className="form-line">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="form-input-wides">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-textbox"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. myname@example.com"
                />
              </div>
            </li>

            <li className="form-line">
              <label htmlFor="phnumber" className="form-label">Phone Number</label>
              <div className="form-input-wides">
                <input
                  type="tel"
                  id="phnumber"
                  name="mob"
                  className="form-textbox"
                  value={formData.mob}
                  onChange={handleChange}
                  placeholder="(000) 000-0000"
                />
              </div>
            </li>

            <li className="form-line">
              <label htmlFor="address" className="form-label">Permanent Address</label>
              <div className="form-input-wides">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-textbox"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </li>

            <li className="form-line">
              <label htmlFor="sports" className="form-label">Sports</label>
              <div className="form-input-wide">
                <input
                  type="checkbox"
                  id="sp1"
                  name="sports"
                  value="1"
                  onChange={handleChange}
                />
                <label htmlFor="sp1">Badminton</label>
              </div>
              <div className="form-input-wide">
                <input
                  type="checkbox"
                  id="sp1"
                  name="sports"
                  value="2"
                  onChange={handleChange}
                />
                <label htmlFor="sp1">Chess</label>
              </div>
              <div className="form-input-wide">
                <input
                  type="checkbox"
                  id="sp1"
                  name="sports"
                  value="3"
                  onChange={handleChange}
                />
                <label htmlFor="sp1">Hockey</label>
              </div>
            </li>

            <li className="form-line">
              <label className="form-label">Do You Have Any Scholarship?</label>
              <div className="form-input-wide">
                <input
                  type="radio"
                  id="scholarship_yes"
                  name="scholarship"
                  value="Yes"
                  onChange={handleChange}
                />
                <label htmlFor="scholarship_yes">Yes</label>

                <input
                  type="radio"
                  id="scholarship_no"
                  name="scholarship"
                  value="No"
                  onChange={handleChange}
                />
                <label htmlFor="scholarship_no">No</label>
              </div>
            </li>

            <li className="form-line">
              <label htmlFor="comments" className="form-label">Suggestions / Comments</label>
              <div className="form-input-wides">
                <textarea
                  id="comments"
                  name="comments"
                  className="form-textarea"
                  value={formData.comments}
                  onChange={handleChange}
                />
              </div>
            </li>

            <li className="form-line">
              <div className="form-input-wide mt-auto">
                <button type="submit" className="form-submit-button">Submit</button>
                <button type="reset"   className="form-submit-button ml">Clear</button>
              </div>
            </li>
          </ul>
        </ul>
      </form>
    </div>
  )
}

export default form2