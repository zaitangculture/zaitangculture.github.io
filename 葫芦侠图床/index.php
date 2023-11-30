<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>葫芦侠免费图床</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: url('https://api.suyanw.cn/api/comic') no-repeat center center fixed;
      background-size: cover;
      margin: 0;
      padding: 0;
    }

    form {
      max-width: 600px;
      margin: 50px auto;
      background-color: rgba(255, 255, 255, 0.8);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 80px;
      border-radius: 50px;
    }

    h1 {
      text-align: center;
      margin-top: 0;
      color: #333;
      text-shadow: 1px 1px #fff;
    }

    label {
      font-size: 14px;
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }

    input[type=file] {
      display: block;
      margin-bottom: 10px;
      padding: 10px;
      border: none;
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 0.7);
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
    }

    input[type=submit] {
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.2s ease-in-out;
    }

    input[type=submit]:hover {
      background-color: #0066cc;
    }

    .status {
      margin-top: 20px;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 3px;
      display: none;
    }

    .status.success {
      background-color: #d4edda;
      color: #155724;
      border-color: #c3e6cb;
    }

    .status.error {
      background-color: #f8d7da;
      color: #721c24;
      border-color: #f5c6cb;
    }
  </style>
</head>

<body>
  <form action="#" method="POST" enctype="multipart/form-data" id="upload-form">
    <h1>葫芦侠免费图床</h1>
<label for="file">选择一个图像文件：</label>
<input type="file" id="file" name="file" accept="image/*"><br>
<input type="submit" value="上传">
<div class="status" id="status"></div>
  </form>
	<script>
		const form = document.getElementById('upload-form');
		const status = document.getElementById('status');

		form.addEventListener('submit', event => {
			event.preventDefault();
			status.style.display = 'none';

			const fileInput = document.getElementById('file');
			const file = fileInput.files[0];
			if (!file) {
				showError('Please choose a file to upload.');
				return;
			}

			const formData = new FormData();
			formData.append('file', file);

			const xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          try {
            const responseJson = JSON.parse(xhr.responseText);
            const url = responseJson.url;
            if (url) {
              showSuccess(`图片网址 ${url}`);
            } else {
              showError('Failed to upload the image.');
            }
          } catch (error) {
            showError('Failed to parse the response from the server.');
          }
        } else if (this.readyState === XMLHttpRequest.DONE) {
          showError(`Server returned status code ${xhr.status}.`);
        }
			};
			xhr.open('POST', 'https://api.suyanw.cn/huluxia/upload.php');
			xhr.send(formData);

			function showSuccess(message) {
				status.textContent = message;
				status.classList.remove('error');
				status.classList.add('success');
				status.style.display = 'block';
			}

			function showError(message) {
				status.textContent = message;
				status.classList.remove('success');
				status.classList.add('error');
				status.style.display = 'block';
			}
		});
	</script>
</body>
</html>